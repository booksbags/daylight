import threading


class MyThread(threading.Thread):
    def __init__(self, fn):
        threading.Thread.__init__(self)
        self.fn = fn

    def run(self):
        self.fn()