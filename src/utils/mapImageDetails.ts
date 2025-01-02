import { ImageSourcePropType } from 'react-native';

import Jb5 from '~/assets/jobs/bricklayer.png';
import Jb1 from '~/assets/jobs/cleaning.png';
import Jb2 from '~/assets/jobs/electric.png';
import Jb7 from '~/assets/jobs/gardener.png';
import others from '~/assets/jobs/others.png';
import Jb4 from '~/assets/jobs/painting.png';
import Jb3 from '~/assets/jobs/plumber.png';

export const mapImageDetails: Record<string, ImageSourcePropType> = {
  CLEANER: Jb1,
  ELECTRICIAN: Jb2,
  PLUMBER: Jb3,
  PAINTER: Jb4,
  BRICKLAYER: Jb5,
  GARDENER: Jb7,
  OTHERS: others,
};
