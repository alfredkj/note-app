const yargs = require('yargs')
const notes = require("./notes.js")

const log = console.log


//Add a note operation
yargs.command({
    command: 'add',
    description: 'To add an note',
    builder: {
        title: {
            description: 'Subject of the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Remove a note operation
yargs.command({
    command: 'remove',
    description: 'To remove a note',
    builder: {
        title: {
            description: 'Title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }
})

//List the notes
yargs.command({
    command: 'list',
    description: 'To list the notes',
    builder: {
        title: {
            description: 'Specify the title of notes to be listed',
            demandOption: false,
            type: 'string'
        }
    },
    handler() {
        notes.listNotes()
    }
})

//Read a note
yargs.command({
    command: 'read',
    description: 'To read a note',
    builder: {
        title: {
            description: 'Specify the title of notes to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})

yargs.parse()
//log(process.argv)
//log(yargs.argv)
