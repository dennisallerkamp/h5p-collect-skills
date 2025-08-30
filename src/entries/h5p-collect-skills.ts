import ReactRenderer from '@components/ReactRenderer';
import { Translation } from '@/Translations';
import Skill from '@model/Skill';
import ActivityHistory from '@model/ActivityHistory';
import { State } from '@context/StateContext';

class CollectSkillsContentType extends H5P.ContentType(true) {
  private renderer: ReactRenderer;
  private readonly state: State;
  private readonly containerId: string;
  private readonly contentId: number;
  private firstTime = true;

  public static canStoreState = false;

  constructor(
    options: { skills: Skill[]; translations: { [key: string]: string } },
    contentId: number,
    contentData: { previousState?: any } = {},
  ) {
    super();

    // complete image paths
    // (This code is here, because it calls H5P.getPath() and
    // H5P should only be used in this file.)
    for (const category of options.skills) {
      if (category.image) {
        category.image.path = H5P.getPath(category.image.path, contentId);
      } else {
        category.image = { path: '', width: 0, height: 0, copyright: '' };
      }
    }

    Translation.set_translations(options.translations);
    localStorage.setItem('contentId', contentId.toString());

    this.contentId = contentId;
    this.containerId = 'collect-skills';
    this.state = {
      skills: Skill.from(options.skills),
      history: new ActivityHistory(),
    };

    this.setActivityId(this.state.skills);
    this.tryToRestoreState(contentData.previousState);

    CollectSkillsContentType.canStoreState =
      typeof H5PIntegration?.saveFreq === 'number' ||
      H5PIntegration?.saveFreq !== false;

    this.renderer = new ReactRenderer(
      this.containerId,
      this.state,
      this.firstTime,
    );
  }

  /**
   * Attach function called by H5P framework to insert H5P content into page
   * @param {jQuery} container
   */
  public attach(container: JQuery) {
    this.renderer.attachInitial(container);
    this.adjustContainerHeight();
  }

  /** Set the id of each activity to a unique value
   * @param skills
   */
  private setActivityId(skills: Skill[]): void {
    skills.forEach((skill, skillindex) => {
      skill.activities.forEach((activity, index) => {
        activity.id = 'activity_' + skillindex + '_' + index;
      });
    });
  }

  /**
   * Adjust the height of the container to fit the window size.
   * This is necessary because the container is in an iframe.
   */
  private adjustContainerHeight() {
    const container = document.getElementById(this.containerId);
    const height = parent.window.innerHeight - 100;
    container.setAttribute('style', 'height: ' + height + 'px;');
  }

  /**
    Restore the state of the content from the previous session if it exists
    @param previousState
   */
  private tryToRestoreState(previousState: any) {
    if (typeof previousState !== 'object') return;

    H5P.getUserData(this.contentId, 'state', (error, data) => {
      if (error) {
        console.error('Error fetching user data:', error);
        return;
      }

      this.restoreStateFromData(data);
    });

    this.firstTime = false;
  }

  /**
   * Restore the state of the content from the data
   * @param data
   */
  private restoreStateFromData(data: any) {
    if (data === null || data.history === undefined) return;

    data.history.entries.forEach((entry: any) => {
      this.state.skills.forEach((skill) => {
        const activity = skill.activities.find(
          (activity) => activity.id === entry.activityId,
        );
        activity?.markAsAbsolved();
      });

      entry.date = new Date(entry.date);
    });

    this.state.history = new ActivityHistory(data.history.entries);
  }

  /**
   * Store the state of the content
   * @param history
   */
  public static storeState(history: any) {
    if (!CollectSkillsContentType.canStoreState) return;
    H5P.setUserData(
      localStorage.getItem('contentId'),
      'state',
      history,
      { deleteOnChange: true }, // Use default behavior of H5P core
    );
  }
}

(H5P as any) = H5P || {};
(H5P as any).CollectSkills = CollectSkillsContentType;
