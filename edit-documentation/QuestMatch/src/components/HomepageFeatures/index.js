import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import github from '@site/static/img/GitHub-logo.png'

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
    title: 'Powered by React.js',
    Svg: require('@site/static/img/ReactLogo.svg').default,
    description: (
      <>
        The app front end is being powered by React.js. This javascript framework will enable the developers to create a real time application that the user can interact with effortlessly. This will vastly improve the user experience.
      </>
    ),
  },
  {
    title: 'Discord Server',
    Svg: require('@site/static/img/discord.svg').default,
    description: (
      <>
        <iframe src="https://discord.com/widget?id=1130512537738285227&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
      </>
    ),
  },
  {
    title: 'GitHub Repo',
    Svg: require('@site/static/img/github.svg').default,
    description: (
      <>
        <a href="https://github.com/porfanid/QuestMatch"><img src={github}/></a>
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
