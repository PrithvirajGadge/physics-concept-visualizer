export const pulleyFlashcard = {
  title: 'Pulley Power — Mechanical Advantage',
  badge: 'Concept Brief',
  sections: [
    {
      type: 'text',
      body: 'A pulley redirects a rope over a wheel. On its own, a fixed pulley just changes the direction you pull in. Add a movable pulley attached to the load, and something more interesting happens: the load\'s weight gets shared across multiple rope segments.',
    },
    {
      type: 'formula',
      label: 'Effort force required',
      expression: 'F = W / n',
    },
    {
      type: 'list',
      heading: 'What each term means',
      items: [
        'W — the weight of the load (mass × gravity), in Newtons',
        'n — the number of rope segments supporting the load (mechanical advantage)',
        'F — the effort force you actually have to pull with',
      ],
    },
    {
      type: 'text',
      body: 'More supporting segments means less force needed to lift the same weight — but there\'s a catch.',
    },
    {
      type: 'insight',
      body: 'You pull the rope n times farther to raise the load the same height. Total work (force × distance) stays the same — pulleys trade force for distance, they never create free energy.',
    },
    {
      type: 'list',
      heading: 'Real-world examples',
      items: [
        'Construction cranes use multi-pulley blocks to lift heavy materials with manageable motor force',
        'Sailboat rigging uses block-and-tackle systems to trim sails by hand',
        'Elevators and gym cable machines both rely on the same force-sharing principle',
      ],
    },
  ],
}
