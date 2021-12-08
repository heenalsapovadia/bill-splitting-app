from datetime import datetime

class Summary:
    def __init__(self):
        self.reset()
    
    def calculate_summary(self, iterator, reset=True):
        """
        Calculates the summary of all users from transactions.
        """
        if reset:
            self.reset()
        
        for t in iterator:
            self.calculate_monthly_spend(t)
            self.calculate_monthly_lend(t)
            self.calculate_monthly_borrow(t)
            self.calculate_monthly_lend_transactions(t)
            self.calculate_monthly_interacted_users(t)
        
        return self.get_summary()

    def reset(self):
        self.summary = {}
    
    def get_summary(self):
        return self.summary
    
    def get_dynamodb_summary(self, dt=None):
        dynamodb_summary = []
        
        if dt is None:
            dt = datetime.now()
        
        ym = dt.strftime('%Y%m')
        for k, v in self.summary.items():
            d = v.copy()
            d['userId'] = k
            d['yearMonth'] = ym
            dynamodb_summary.append(d)
        
        return dynamodb_summary

    def calculate_monthly_spend(self, t):
        try:
            self.summary[t['userId']] = self.summary.get(t['userId'], {})
            self.summary[t['userId']]['monthly_spend'] = self.summary[t['userId']].get('monthly_spend', 0) + t['amount']
        except:
            pass
    
    def calculate_monthly_lend(self, t):
        try:
            self.summary[t['userId']] = self.summary.get(t['userId'], {})
            self.summary[t['userId']]['monthly_lend'] = self.summary[t['userId']].get('monthly_lend', 0) + (t['amount']/2)
        except:
            pass
    
    def calculate_monthly_borrow(self, t):
        try:
            self.summary[t['splitUserId']] = self.summary.get(t['splitUserId'], {})
            self.summary[t['splitUserId']]['monthly_borrow'] = self.summary[t['splitUserId']].get('monthly_borrow', 0) + (t['amount']/2)
        except:
            pass
    
    def calculate_monthly_lend_transactions(self, t):
        try:
            self.summary[t['userId']] = self.summary.get(t['userId'], {})
            self.summary[t['userId']]['monthly_lend_transactions'] = self.summary[t['userId']].get('monthly_lend_transactions', 0) + 1
        except:
            pass
    
    def calculate_monthly_borrow_transactions(self, t):
        try:
            self.summary[t['splitUserId']] = self.summary.get(t['splitUserId'], {})
            self.summary[t['splitUserId']]['monthly_borrow_transactions'] = self.summary[t['splitUserId']].get('monthly_borrow_transactions', 0) + 1
        except:
            pass
    
    def calculate_monthly_interacted_users(self, t):
        try:
            self.summary[t['userId']] = self.summary.get(t['userId'], {})
            self.summary[t['userId']]['interacted_users'] = self.summary[t['userId']].get('interacted_users', set())
            self.summary[t['userId']]['interacted_users'].add(t['splitUserId'])
        
            self.summary[t['splitUserId']] = self.summary.get(t['userId'], {})
            self.summary[t['splitUserId']]['interacted_users'] = self.summary[t['splitUserId']].get('interacted_users', set())
            self.summary[t['splitUserId']]['interacted_users'].add(t['userId'])
        except:
            pass
