import inquirer from 'inquirer';
import { TEMPLATES } from '../constants';

export interface Meta {
  name: string;
  description: string;
  mode: string;
  user: string;
}

export async function prompt(projectName: string) {
  const choices = TEMPLATES.map((t) => ({
    name: t.name,
    value: t.value,
  }));

  const questions = [
    {
      name: 'name',
      message: 'project name',
      default: projectName,
    },
    {
      name: 'description',
      message: 'description',
      default: ``,
    },
    {
      name: 'user',
      message: 'github user name',
      default: ``,
    },
    {
      name: 'mode',
      type: 'list',
      message: 'Please select a mode.',
      choices: [new inquirer.Separator('Modes'), ...choices],
    },
  ];

  const meta = (await inquirer.prompt(questions)) as Meta;

  return meta;
}
