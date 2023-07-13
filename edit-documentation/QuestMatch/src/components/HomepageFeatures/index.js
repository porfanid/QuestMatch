import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Answer the call',
    Svg: require('@site/static/img/d20.svg').default,
    description: (
      <>
        This page was created so that we can create this project from the ground up. By writing code for either the front end or the back end, one can contribute to make this app more attrective ant we can ultimately use this app to make the dream of having an app where one can meet and chat with DND groups better.
      </>
    ),
  },
  {
    title: 'What makes this app different from all the others?',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        By creating this app rom scratch we can focus solely on this purpose. The app will be specifically designed so that people can meet with each other and talk about DND. Ultimately, they will create groups that can be used for playing DND, either online or in person.
      </>
    ),
  },
  {
    title: 'Powered by View.js',
    Svg: require('@site/static/img/vuejs.svg').default,
    description: (
      <>
        The app front end is being powered by View.js. This javascript framework will enable the developers to create a real time application that the user can interact with effortlessly. This will vastly improve the user experience.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
