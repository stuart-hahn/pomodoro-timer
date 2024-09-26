// Import required modules
import chalk from "chalk"; // for styling console output
import inquirer from "inquirer"; // for user interactions

// Timer function using setTimeout
const timer = (minutes, message) => {
  return new Promise((resolve) => {
    console.log(chalk.green(`Timer set for ${minutes} minutes...`));
    setTimeout(() => {
      console.log(chalk.yellow(message));
      resolve();
    }, minutes * 60 * 1000);
  });
};

// Main function to run the pomo timer
const startPomodoro = async () => {
  console.clear();
  console.log(chalk.blue(`Welcome to the Pomodoro Timer!`));

  let sessionCount = 0;

  while (true) {
    sessionCount += 1;

    console.log(chalk.cyan(`\nStarting Pomodoro Session #${sessionCount}`));
    await timer(25, `Time to take a break!`);

    if (sessionCount % 4 === 0) {
      // long break after 4 sessions
      console.log(chalk.magenta(`Long break time!`));
      await timer(15, `Break over, ready to work?`);
    } else {
      // short break
      console.log(chalk.magenta(`Short break time.`));
      await timer(5, `Break over. Ready for the next session?`);
    }

    // Prompt user to continue or exit
    const { continueSession } = await inquirer.prompt([
      {
        type: "confirm",
        name: "continueSession",
        message: "Would you like to start another session?",
      },
    ]);

    if (!continueSession) {
      console.log(
        chalk.foregroundColorNames("Thank you for using the Pomodoro Timer!")
      );
      break;
    }
  }
};

// Execute the main function
startPomodoro();
