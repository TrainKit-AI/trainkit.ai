export const SERVICES = {
  trigger: 'OUR SERVICES',
  content: [
    {
      title: 'Building AI',
      item: [
        {
          link: '/trainkit-data-engine',
          icon: '/assets/svg/trainkit-data-engine-logo.svg',
          title: 'TrainKit Data Engine',
          description: 'Data for training models',
        },
      ],
    },
  ],
};

export type DropdownMenu = {
  trigger: string;
  content: {
    title: string;
    item: {
      link: string;
      icon: string;
      title: string;
      description: string;
    }[];
  }[];
};
