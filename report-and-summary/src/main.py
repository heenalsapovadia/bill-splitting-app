from datetime import datetime
from datetime import datetime
from typing import Iterator

import dynamodb_util
from dynamodb_util import get_all_items
import summary


def execute(dt: datetime=datetime.now()):
    iterator = dynamodb_util.get_transactions(dt=dt)
    monthly_summary = summary.Summary()
    monthly_summary.calculate_summary(iterator=iterator)
    items = monthly_summary.get_dynamodb_summary(dt=dt)
    # print(items)
    dynamodb_util.put_summary(items=items)


if __name__ == '__main__':
    execute(datetime(2022, 1, 3))
