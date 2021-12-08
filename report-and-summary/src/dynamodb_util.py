import boto3
from boto3.dynamodb.conditions import Attr

from decimal import Decimal
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta


def get_dynamodb_client():
    """
    Get a dynamodb client
    """
    return boto3.client('dynamodb')


def get_dynamodb_resource():    
    """
    Get a dynamodb resource
    """
    return boto3.resource('dynamodb')


def get_dynamodb_table(table_name):   
    """
    Get a dynamodb table
    """
    return get_dynamodb_resource().Table(table_name)


def get_all_items(table_name):
    """
    Get all items from a dynamodb table
    """
    return get_dynamodb_table(table_name).scan()['Items']


def put_item(table_name, item):
    """
    Put an item into a dynamodb table
    """
    return get_dynamodb_table(table_name).put_item(Item=item)


def put_items(table_name, items):
    """
    Put items into a dynamodb table
    """
    with get_dynamodb_table(table_name).batch_writer() as batch:
        for item in items:
            for k, v in item.items():
                if type(v) == float:
                    item[k] = Decimal(v)
            batch.put_item(Item=item)

def put_summary(items):
    """
    Put items into a dynamodb table
    """
    return put_items('summary', items)


def get_transactions(dt: datetime, exclusiveStartKey:dict=None):
    """
    Get transactions for a given year and month
    """
    if dt is None:
        dt = datetime.now()
        
    start_date = int((datetime(dt.year, dt.month, 1, 0, 0, 0) - relativedelta(months=1)).timestamp()) * 1000
    end_date = int((datetime(dt.year, dt.month, 1, 23, 59, 59) - relativedelta(months=1) + relativedelta(day=31)).timestamp()) * 1000
    args = {'FilterExpression': Attr('timestamp').gt(f'{start_date}') & Attr('timestamp').lt(f'{end_date}')}
    if exclusiveStartKey:
        args['ExclusiveStartKey'] = exclusiveStartKey
    resp = get_dynamodb_table('transactions').scan(**args)
    for i in resp['Items']:
        for k, v in i.items():
            if type(v) == Decimal:
                i[k] = float(v)
        yield i
    
    if resp.get('LastEvaluatedKey'):
        for i in get_transactions(year, month, resp['LastEvaluatedKey']):
            yield i
