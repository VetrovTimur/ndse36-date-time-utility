#!/usr/bin/env node

const yargs = require('yargs');

const getCurrentDateTime = () => {
    return new Date().toISOString();
};

const adjustDate = (date, days = 0, months = 0) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate.toISOString();
};

yargs.command({
    command: 'current',
    describe: 'Получить текущую дату и время',
    builder: {
        year: {
            alias: 'y',
            type: 'boolean',
            describe: 'Получить текущий год'
        },
        month: {
            alias: 'm',
            type: 'boolean',
            describe: 'Получить текущий месяц'
        },
        date: {
            alias: 'd',
            type: 'boolean',
            describe: 'Получить текущую дату'
        }
    },
    handler: (argv) => {
        if (argv.year) {
            console.log(new Date().getFullYear());
        } else if (argv.month) {
            console.log(new Date().getMonth() + 1); 
        } else if (argv.date) {
            console.log(new Date().getDate());
        } else {
            console.log(getCurrentDateTime());
        }
    }
});

yargs.command({
    command: 'add',
    describe: 'Добавить дни или месяцы к текущей дате',
    builder: {
        days: {
            alias: 'd',
            type: 'number',
            describe: 'Количество дней для добавления'
        },
        months: {
            alias: 'm',
            type: 'number',
            describe: 'Количество месяцев для добавления'
        }
    },
    handler: (argv) => {
        const currentDate = new Date();
        const newDate = adjustDate(currentDate, argv.days || 0, argv.months || 0);
        console.log(newDate);
    }
});

yargs.command({
    command: 'sub',
    describe: 'Вычесть дни или месяцы из текущей даты',
    builder: {
        days: {
            alias: 'd',
            type: 'number',
            describe: 'Количество дней для вычитания'
        },
        months: {
            alias: 'm',
            type: 'number',
            describe: 'Количество месяцев для вычитания'
        }
    },
    handler: (argv) => {
        const currentDate = new Date();
        const newDate = adjustDate(currentDate, -(argv.days || 0), -(argv.months || 0));
        console.log(newDate);
    }
});


yargs.parse();


const readline = require('readline');

const min = 0;
const max = 100;
const secretNumber = Math.floor(Math.random() * (max - min + 1));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const startGame = () => {
    console.log(`Загадано число в диапазоне от ${min} до ${max}`);
    askForGuess();
};

const askForGuess = () => {
    rl.question('Введите ваше число: ', (input) => {
        const guess = parseInt(input, 10);

        if (isNaN(guess)) {
            console.log('Пожалуйста, введите число.');
            askForGuess();
            return;
        }

        if (guess < min || guess > max) {
            console.log(`Число должно быть в диапазоне от ${min} до ${max}.`);
            askForGuess();
            return;
        }

        if (guess < secretNumber) {
            console.log('Больше');
            askForGuess();
        } else if (guess > secretNumber) {
            console.log('Меньше');
            askForGuess();
        } else {
            console.log(`Отгадано число ${secretNumber}! Поздравляем!`);
            rl.close();
        }
    });
};

startGame();