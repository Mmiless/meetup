import django

def function():
    print(django.get_version())

def main():
    function()

if __name__ == "__main__":
    main()