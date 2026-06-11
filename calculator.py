import json
import os


class Calculator:
    def __init__(self):
        self.history_file = "history.json"
        self.history = []
        self.load_history()

    # Load history from file
    def load_history(self):
        if os.path.exists(self.history_file):
            try:
                with open(self.history_file, "r") as file:
                    self.history = json.load(file)

                if not isinstance(self.history, list):
                    self.history = []

            except:
                self.history = []
        else:
            self.history = []

    # Save history to file
    def save_history(self):
        with open(self.history_file, "w") as file:
            json.dump(self.history, file, indent=4)

    # Evaluate expression
    def evaluate(self, expression):
        try:
            expression = expression.replace("%", "/100")

            result = eval(expression)

            self.history.append({
                "expression": expression,
                "result": result
            })

            self.save_history()

            return result

        except ZeroDivisionError:
            return "Cannot divide by zero"

        except Exception as e:
            return f"Error: {e}"

    # View history
    def show_history(self):

        # Always reload latest history
        self.load_history()

        print("\n========== HISTORY ==========")

        if len(self.history) == 0:
            print("No History Found.")
            return

        for index, item in enumerate(self.history, start=1):
            print(
                f"{index}. {item['expression']} = {item['result']}"
            )

    # Clear history
    def clear_history(self):
        self.history = []
        self.save_history()
        print("\nHistory Cleared Successfully!")


# ==========================
# Main Program
# ==========================

calc = Calculator()

while True:

    print("\n========================")
    print("      CALCULATOR")
    print("========================")
    print("1. Calculate")
    print("2. View History")
    print("3. Clear History")
    print("4. Exit")

    choice = input("\nEnter Choice: ").strip()

    # Option 1
    if choice == "1":

        expression = input(
            "\nEnter Expression: "
        )

        result = calc.evaluate(expression)

        print("Result =", result)

    # Option 2
    elif choice == "2":

        print("\nLoading History...")
        calc.show_history()

    # Option 3
    elif choice == "3":

        confirm = input(
            "\nAre you sure? (y/n): "
        )

        if confirm.lower() == "y":
            calc.clear_history()

    # Option 4
    elif choice == "4":

        print("\nThank You!")
        break

    else:

        print("\nInvalid Choice! Please try again.")