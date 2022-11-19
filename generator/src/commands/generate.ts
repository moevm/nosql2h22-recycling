import {Command, Flags} from '@oclif/core'

export default class Generate extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    name: Flags.string({char: 'n', description: 'name to print'}),
    force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Generate)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /home/evgeny/nosql2h22-recycling/generator/src/commands/generate.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
