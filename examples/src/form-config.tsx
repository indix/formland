export default [
  {
    id: 'group-1',
    type: 'group',
    displayName: 'Group 1',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia impedit minus laudantium, excepturi unde tenetur commodi voluptatem iste, beatae saepe ipsa consequatur maiores eaque provident dolor qui numquam nam laborum.',
    elements: [
      {
        id: 'text',
        type: 'text',
        resultPath: 'input.text',
        displayName: 'Input Textbox',
        placeholder: 'Enter something',
      },
      {
        id: 'textarea',
        type: 'textarea',
        resultPath: 'input.textarea',
        displayName: 'Input Textarea',
        placeholder: 'placeholder',
        validation: (value: any) =>
          value && value.includes('textarea')
            ? null
            : `Value should contain 'textarea'.`,
        optional: true,
      },
      {
        id: 'checkbox',
        type: 'checkbox',
        helpText: 'help text',
        required: true,
        resultPath: 'input.checkbox',
        displayName: 'Input Checkbox',
        simpleValues: true,
        separator: '_',
        options: [
          {
            value: 'one',
            label: 'One',
          },
          {
            value: 'two',
            label: 'Two',
          },
          {
            value: 'three',
            label: 'Three',
          },
        ],
      },
    ],
  },
  {
    id: 'group-2',
    type: 'group',
    displayName: 'Group 2',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil officia possimus rerum, dolor ea temporibus quidem necessitatibus omnis praesentium cumque magnam, autem atque dignissimos consequatur. Distinctio, consequatur nemo? Quibusdam, maiores!',
    elements: [
      {
        id: 'radio',
        type: 'radio',
        resultPath: 'input.radio',
        displayName: 'Input Radio',
        options: [
          {
            value: 'one',
            label: 'One',
          },
          {
            value: 'two',
            label: 'Two',
          },
          {
            value: 'three',
            label: 'Three',
          },
        ],
      },
      {
        id: 'dropdown',
        type: 'dropdown',
        resultPath: 'input.dropdown',
        displayName: 'Input Dropdown',
        options: [
          {
            value: 'one',
            label: 'One',
          },
          {
            value: 'two',
            label: 'Two',
          },
          {
            value: 'three',
            label: 'Three',
          },
        ],
      },
      {
        id: 'toggle',
        type: 'toggle',
        resultPath: 'input.toggle',
        displayName: 'Input Toggle',
      },
      {
        id: 'range',
        type: 'range',
        resultPath: 'input.range',
        displayName: 'Input Range',
        required: true,
        componentProps: {
          step: 1,
          min: 0,
          max: 50,
        },
      },
    ],
  },
  {
    id: 'react-select',
    type: 'react-select',
    resultPath: 'input.react',
    displayName: 'React Select',
    optional: true,
    options: [
      {
        value: 'one',
        label: 'One',
      },
      {
        value: 'two',
        label: 'Two',
      },
      {
        value: 'three',
        label: 'Three',
      },
    ],
  },
]
