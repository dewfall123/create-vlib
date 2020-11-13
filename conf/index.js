module.exports = {
  getDefaultPrompt: (context) => {
    return [
      {
        name: "projectName",
        message: "项目的名称",
        default: context.name,
      },
      {
        name: "projectVersion",
        message: "项目的版本号",
        default: "0.0.1",
      },
      {
        name: "projectDescription",
        message: "项目的简介",
        default: `A project named ${context.name}`,
      },
    ];
  },
  updateNPMPrompt: [
    {
      type: "list",
      message: "请选择更新npm的方法",
      name: "npmType",
      choices: [
        {
          name: "yarn",
          message: "yarn",
        },
        {
          name: "npm",
          message: "npm",
        },
        {
          name: "cnpm",
          message: "cnpm",
        },
      ],
    },
  ],
};
