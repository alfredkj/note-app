const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => "Your learning and notes are not completed ! ";

// the addNote
const addNote = (title, body) => {
    const notes = loadNotes()
    //The filter method returns an sub array which contains all the matching elements according to the lambda.
    //Even if the duplicate element is found the filter method will go through the whole array to find out 
    //any additional array elements which will match the lambda. To avoid this use the method find.
    const duplicateTitleNotes = notes.filter(note => note.title === title)
    //If there is no duplicate note is found the duplicateTitleNote value will be undefined
    //So to handle that case compare the duplicateTitleNote is undefined or not.
    const duplicateTitleNote = notes.find(note => note.title === title)
    if (duplicateTitleNote === undefined) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("Note with title: \"" + title + "\" is saved !"))
    } else {
        console.log(chalk.red.inverse("The title: \"" + title + "\" is taken ! Please use a different title"))
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    //console.log(notes)
    const remainingNotes = notes.filter(note => note.title.trim() !== title.trim())
    //console.log(remainingNotes)
    if (notes.length > remainingNotes.length) {
        saveNotes(remainingNotes)
        console.log(chalk.green.inverse(title + " note is removed"))
    } else {
        console.log(chalk.red.inverse("No note with title " + title + " is removed"))
    }
}

//Load the notes and get it as a JSON object.If notes is empty 
//get it as an empty array
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)
    } catch (e) {
        return []
    }
}

//Save the notes JSON in notes  file 
const saveNotes = (notes) => {
    try {
        const notesData = JSON.stringify(notes)
        fs.writeFileSync('notes.json', notesData)
        return true
    } catch (e) {
        return false
    }
}

//List the notes 
const listNotes = () => {
    notes = loadNotes()
    console.log(chalk.green.inverse("Your Note Titles & Body"))
    notes.forEach(note => {
        console.log(chalk.yellow.inverse(note.title))
        console.log(chalk.blue.inverse(note.body))
    });
}

//Read the notes 
const readNotes = (title) => {
    notes = loadNotes()
    note = notes.find(note => note.title.trim() === title.trim())
    if (note !== undefined) {
        console.log(chalk.yellow.inverse(note.title))
        console.log(chalk.blue.inverse(note.body))
    } else {
        console.log("Note titled: " + chalk.red.inverse(title) + " not found")
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}