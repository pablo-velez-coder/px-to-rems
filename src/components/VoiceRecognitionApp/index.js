import React, { useState,  useEffect } from 'react'
import './styles.scss'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continous = true
mic.interimResults = true
mic.lang = 'es-PE'

const VoiceRecognitionApp = () => {

    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null);
    const [savedNotes, setSavedNotes] = useState([]);

    useEffect(() => {
        handleListen()
    }, [isListening]);

    const handleListen = () =>{
        if(isListening){
            mic.start();
            mic.onend = () =>{
                console.log('contine')
                mic.start()
            }
        }else{
            mic.stop();
            mic.onend = () =>{
                console.log('stopped mic on click')
            }
        }
        mic.onstart = () =>{
            console.log('mics on')
        }
        mic.onresult = event =>{
            const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            setNote(transcript)
            mic.onerror = event => {
              console.log(event.error)
            }
        }
    }

    const handleSaveNote = () =>{
        setSavedNotes([...savedNotes, note])
        setNote('')
    }


    return (
        <div className='container'>
            <h2>Todo con reconocedor de voz</h2>
{isListening ? 'recording...': ''}
            <div>
                <button onClick={handleSaveNote} disabled={!note}>
                    Save note
                </button>
                <button onClick={()=> setIsListening(!isListening)}>
                    Start/Stop
                </button>
            </div>
{note}
<div>
    Tareas
    <div>
        {
            savedNotes.map((item, i) => (
                <p key={i}>{i+1}. {item}</p>
            ))
        }
    </div>
</div>
        </div>
    )
}

export default VoiceRecognitionApp
