import { addBasePath } from 'next/dist/client/add-base-path';

const NOTHING_PLACEHOLDER_IMAGE_PATH = addBasePath('/assets/svgs/nothing.svg');
const PROFILE_PLACEHOLDER_IMAGE_PATH = addBasePath('/assets/svgs/person.svg');
const ERROR_IMAGE_PATH = addBasePath('/assets/svgs/error.svg');
const LOGO_IMAGE_PATH = addBasePath('/assets/svgs/logo.svg');
const DARK_TMDB_IMAGE_PATH = addBasePath('/assets/svgs/tmdbgreen.svg');
const LIGHT_TMDB_IMAGE_PATH = addBasePath('/assets/svgs/tmdb.svg');


export {
  NOTHING_PLACEHOLDER_IMAGE_PATH,
  PROFILE_PLACEHOLDER_IMAGE_PATH,
  ERROR_IMAGE_PATH,
  LOGO_IMAGE_PATH,
  DARK_TMDB_IMAGE_PATH,
  LIGHT_TMDB_IMAGE_PATH
};
