import { spawn } from "child_process"

/**
 * Funcion que a traves del spawn ejecuta cierto comando
 * @param cmd Comando
 * @param args Argumento
 */
export const execmd = (cmd: string, args: string[]) =>{
  return new Promise<string>((resolve, reject) => {
    const command = spawn(cmd,args)

    let allData = ''
    command.stdout.on('data', (data) => {
      allData += data
    })

    command.on('error', () => {
      reject('Ha ocurrido un error en la ejecucion');
    })

    command.on('close', () => {
      resolve(allData)
    })
  });
}