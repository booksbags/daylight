s = list("""abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRQSTUVWXYZ0123456789,./;'[]\`<>?:"{|_+-~@#￥%^&*(!)}""")

def addStr(s):
    return "\"{}\"".format(s)

print(s, len(s))