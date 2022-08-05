import React, { useState, useEffect, useRef } from 'react'
import { Button, Text, View } from 'react-native'

function useInterval(callback, delayValue) {
  const savedCallback = useRef()
  const savedTimeout = useRef()
  const [delay, setDelay] = useState(delayValue)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => {
        savedCallback.current()
      }, delay)
      savedTimeout.current = id
      return () => clearInterval(id)
    } else {
      if (savedTimeout.current !== undefined){
        clearInterval(savedTimeout.current)
      }
    }
  }, [delay])

  return [delay, setDelay]
}

export default function App() {
  const [count, setCount] = useState(0)
  let [delay, setDelay] = useInterval(() => {
    setCount(count + 1)
  }, 1000)

  return (
    <View>
      <Text style={{ fontSize: 120 }}>{count}</Text>
      <Button title={delay === null ? "PLAY" : "STOP"} onPress={
        ()=>{
          delay === null ? setDelay(1000) : setDelay(null)
        }
      } />
    </View>
  )
}