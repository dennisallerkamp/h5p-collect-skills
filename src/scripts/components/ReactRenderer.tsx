import React from 'react';
import { createRoot } from 'react-dom/client';
import CollectSkills from '@components/CollectSkills';
import './ReactRenderer.scss';
import { State } from '@context/StateContext';

export default class ReactRenderer {
  private readonly id: string;

  constructor(
    projectId: string,
    private readonly state: State,
    private firstTime: boolean,
  ) {
    this.id = projectId;
    this.state = state;
    this.firstTime = firstTime;
  }

  // Attach the React App to the container
  public attachInitial(container: JQuery) {
    const root: HTMLDivElement = document.createElement('div');
    root.id = this.id;
    container.addClass('react-container');
    container.append(root);

    createRoot(root).render(
      <>
        <CollectSkills
          initialState={{
            history: this.state.history,
            skills: this.state.skills,
          }}
          firstTime={this.firstTime}
        />
      </>,
    );
  }
}
