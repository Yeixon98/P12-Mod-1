import { spawn } from "child_process"

/**
 * Funcion que a traves del spawn ejecuta cierto comando
 * @param cmd Comando
 * @param args Argumento
 * @param callback Callback para test
 */
export const execmd = (cmd: string, args: string[], callback: (err: boolean | undefined, data: string | undefined) => void) =>{
  const command = spawn(cmd,args)

  let allData = ''
  command.stdout.on('data', (data) => {
    allData += data
  })

  command.on('error', (err) => {
    callback(true, undefined)
  })

  command.on('close', () => {
    callback(undefined, allData)
  })
}