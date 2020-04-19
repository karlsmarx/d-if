import colors from "colors/safe";

class Console {
  // Print the message in the git way
  static default (message: string): void {
    const lines = message.split("\n");
    for (const line of lines) {
      const color = (line[0] == "+") ? colors.green : (line[0] == "-") ? colors.red : colors.white;
      console.log(color(line));
    }
  }
}

export default Console;
