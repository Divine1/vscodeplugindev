// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require("axios");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	
	// @ts-ignore
	const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
	console.log("res.data ",res.data);

	const todos = res.data.map((item)=>{
		return {
			label : item.title,
			detail : `${item.id}${item.title}`,
			link : "https://google.com"
		}
	})
	console.log("todos ",todos)

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cbf-demoplugin" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('cbf-demoplugin.helloWorld', async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from cbf-demoplugin!');
		const todopick = await vscode.window.showQuickPick(todos,{
			matchOnDetail : true
		})
		console.log("todopick ",todopick," todopick.link ",todopick.link)
		
		if(todopick ){
			console.log("in if")
			// @ts-ignore
			vscode.env.openExternal(todopick.link);
		}
		else{
			console.log("in else")
			return;
		}

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
