#!/usr/bin/env node

import inquirer from "inquirer";

interface anstype{
    userId: string,
    userPin: number,
    accountType: String,
    transType: String,
    amount:number,
}

type User= {
    userId: String,
    userPin: number,
}

let Users: User[] = [
    {
        userId: "Talha",
        userPin: 4444,
    },
    {
        userId: "Faisal",
        userPin: 1111,
    },
    {
        userId: "Najam",
        userPin: 2222,
    },
    {
        userId: "Afaq",
        userPin: 3333,
    }
]

let balance: number = Math.floor((Math.random() * 100000));         
var answer1: anstype;   
var answer2: anstype;

startLoop();

async function startLoop() {
    await getUserId();
    do {
        await getTransaction();
        var again = await inquirer.prompt([
            {
                type: "List",
                name: "Restart",
                choices: ["yes", "no"],
                message: "Do you want to continue:",
            }
            
        ]);
    } while (again.Restart === "yes");
}
async function getUserId() {
   answer1 = await inquirer.prompt([
        {
            type: "input",
            name: "userId",
            message: "Please Enter your user ID:",  
        },
        {
            type: "number",
            name: "userPin",
            message: "Please Enter your PIN:",
        },
    ])
    await checkUserId(answer1.userId, answer1.userPin); 
}

async function checkUserId(userID: String, userPin: number) {   
    let condition = false;
    for (let i = 0; i < Users.length; i++){
        if (userID === Users[i].userId && userPin === Users[i].userPin) {
            condition = true;
                break;
    
        }
    }
    if (!condition) {
        console.log(`Invalid user ID or Pin. Please try again.`);
        await getUserId();
    }
}
async function getTransaction() {
    answer2 = await inquirer.prompt([
        {
            type: "list",
            name: "accountType",
            choices: ["Current", "Saving"],
            message: "Please select account type"
        },
        {
            type: "list",
            name: "transType",
            choices: ["Fast Cash", "Withdraw"],
            message: "Please select transaction type",
        },
        {
            type: "list",
            name: "ammount",
            choices: [5000, 10000, 15000, 20000, 25000],
            message: `Please select your ammount (Current Balance is ${balance})`,
            when(answer2) {
                return answer2.transType === "Fast Cash";
        },
        },
        {
            type: "number",
            name: "ammount",
            message: `Please enter your your ammount (Current balance is ${balance}): `,
            when(answer2) {
                return answer2.transType == "Withdraw"; 
            }
        }
    
    ])
if (answer1.userId && answer1.userPin) {
    if (answer2.amount <= balance) {
        balance -= answer2.amount;
        console.log(`your current balance is: ${balance}`);
    } else {
        console.log(`Insuficient balance ${balance}`);
    }
    }

}


