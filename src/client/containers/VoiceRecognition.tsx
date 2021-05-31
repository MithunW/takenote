import React, { useState } from 'react'
import { Mic, MicOff } from 'react-feather'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import { ReactMouseEvent } from '@/types'
import 'regenerator-runtime/runtime.js'

const VoiceRecognition = ({ speechDataCallback }: { speechDataCallback: any }) => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  const [state, setState] = useState(false)

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <section className="note-menu-bar voicerec">
      <nav>
        {!state ? (
          <button
            className="note-menu-bar-button"
            onClick={async (event: React.MouseEvent<HTMLButtonElement>) => {
              setState(true)
              await SpeechRecognition.startListening({ continuous: true })
            }}
          >
            <Mic size={18} />
          </button>
        ) : (
          <button
            className="note-menu-bar-button"
            onClick={async (event: React.MouseEvent<HTMLButtonElement>) => {
              SpeechRecognition.stopListening()
              console.log(transcript)
              speechDataCallback(transcript)
              resetTranscript()
              setState(false)
            }}
          >
            <MicOff size={18} />
          </button>
        )}
        <p className="transcript">{transcript}</p>
      </nav>
    </section>
  )
}
export default VoiceRecognition
