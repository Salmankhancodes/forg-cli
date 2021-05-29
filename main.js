#!/usr/bin/env node
let inputArr= process.argv.slice(2);
let command=inputArr[0];
let path = require("path")
let fs = require("fs")
let treeobj = require("./commands/tree")
let helpobj = require("./commands/help")
let organizeobj = require("./commands/organize")



switch(command){
    case "tree":
        treeobj.treekey(inputArr[1]);
        break;

    case "organize":
        organizeobj.organizekey(inputArr[1]);
        break;

    case "help":
        helpobj.helpkey();
        break;

    }

