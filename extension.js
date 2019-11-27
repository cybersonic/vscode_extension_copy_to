// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const Cache = require('vscode-cache');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let myCache = new Cache(context);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "code-extractor" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.extractText', function () {
		// The code you place here will be executed every time your command is executed
	
		const editor = vscode.window.activeTextEditor;
		let selectedCode = editor.document.getText(editor.selection);
	
		openDialogAndAppend(selectedCode, "Content Copied");



	});


	let movetext = vscode.commands.registerCommand("extension.moveText", function(){
		const editor = vscode.window.activeTextEditor;
		// console.log(editor.selection);
		let selection = editor.selection;
		let selectedCode = editor.document.getText(editor.selection);
		


		openDialogAndAppend(selectedCode, "Content Moved", function(){

			let range = new vscode.Range(selection.start, selection.end);
			editor.edit(builder=>{
				builder.replace(range, "");
			});
		});


		
	});


	function openDialogAndAppend(selectedCode, successMessage, callback){
		vscode.window.showOpenDialog({
			canSelectFolders:false,
			canSelectMany:false,
			openLabel:"Append"
		}).then(function(selection){
			for(var select in selection){

				fs.appendFile(selection[select].path,"\n" + selectedCode + "\n", function(err){
					vscode.window.showInformationMessage(err.message);
				});
				vscode.window.showInformationMessage(successMessage);
			}
		}).then(callback);
	}
	context.subscriptions.push(disposable);
	context.subscriptions.push(movetext);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
