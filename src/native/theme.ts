import { StyleSheet } from 'react-native';

// Values mirror branding/website-identity.json and src/brand-tokens.css.
export const colors = {
  bg: '#F4F4F1',
  ink: '#454B4B',
  muted: '#5F6963',
  sage: '#A8B798',
  blue: '#B6CDD6',
  action: '#435342',
  actionPressed: '#344334',
  line: '#D4DAD1',
  surface: '#E9EDE6',
  white: '#FFFFFF',
  focus: '#465E6A',
  controlBorder: '#859180',
  error: '#88453E',
};

export const statusColors = {
  pending: { bg: '#F0EEDD', text: '#675C31' },
  confirmed: { bg: '#E5ECDE', text: '#3F5B43' },
  preparing: { bg: '#E4EDF1', text: '#465E6A' },
  ready: { bg: '#E5ECDE', text: '#3F5B43' },
  completed: { bg: '#E9EDE6', text: '#5F6963' },
  cancelled: { bg: '#F2E7E5', text: '#88453E' },
};

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const fonts = {
  heading: (ar: boolean) => (ar ? 'ArefRuqaa_700Bold' : 'AnticDidone_400Regular'),
  body: 'Amiri_400Regular',
  bodyBold: 'Amiri_700Bold',
};

export const shadow = StyleSheet.create({
  card: {
    shadowColor: colors.ink,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
}).card;
