import { InfiniteHorizontalAnimation } from './infiniteHorizontalAnimation.js';
import { SectionsAnimate } from './sectionsAnimate.js';
import { logger } from '../../utils/logger.js';

export function Home() {
    logger()
    InfiniteHorizontalAnimation();
    SectionsAnimate();
}
