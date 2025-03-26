import { v4 as uuidv4 } from 'uuid';

// Import images
import SocieteGeneraleImage from '../public/images/brands/societe_generale_gray.png';
import OrangeImage from '../public/images/brands/orange_gray.png';
import SncfImage from '../public/images/brands/sncf_gray.png';
import OuiSncfImage from '../public/images/brands/oui_sncf_gray.png';
import RenaultImage from '../public/images/brands/renault_gray.png';
import RciImage from '../public/images/brands/rci_gray.png';
import CartesBancairesImage from '../public/images/brands/cartes_bancaires_gray.png';
import EdfImage from '../public/images/brands/edf_gray.png';

export const clientsHeading = 'Some of the brands I worked with';

export const clientsData = [
	{
		id: uuidv4(),
		title: 'SocieteGenerale',
		img: SocieteGeneraleImage,
	},
	{
		id: uuidv4(),
		title: 'Orange',
		img: OrangeImage,
	},
	{
		id: uuidv4(),
		title: 'Sncf',
		img: SncfImage,
	},
	{
		id: uuidv4(),
		title: 'OuiSncf',
		img: OuiSncfImage,
	},
	{
		id: uuidv4(),
		title: 'Renault',
		img: RenaultImage,
	},
	{
		id: uuidv4(),
		title: 'Rci',
		img: RciImage,
	},
	{
		id: uuidv4(),
		title: 'CartesBancaires',
		img: CartesBancairesImage,
	},
	{
		id: uuidv4(),
		title: 'Edf',
		img: EdfImage,
	},
];
