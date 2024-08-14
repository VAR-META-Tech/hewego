import angleDown from '@/assets/svg/angle-down-solid.svg';
import arrowDown from '@/assets/svg/arrow-down.svg';
import bell from '@/assets/svg/bell.svg';
import bookmark from '@/assets/svg/bookmark.svg';
import checkCircleXs from '@/assets/svg/check-circle-xs.svg';
import closeCircle from '@/assets/svg/close-circle.svg';
import close from '@/assets/svg/close.svg';
import discord from '@/assets/svg/discord.svg';
import dollar from '@/assets/svg/dollar.svg';
import edit from '@/assets/svg/edit.svg';
import eyeHidden from '@/assets/svg/eye-hidden.svg';
import eye from '@/assets/svg/eye.svg';
import facebookCircle from '@/assets/svg/facebook_circle.svg';
import facebook from '@/assets/svg/facebook.svg';
import google from '@/assets/svg/google.svg';
import insecurity from '@/assets/svg/insecurity.svg';
import location from '@/assets/svg/location.svg';
import menu from '@/assets/svg/menu.svg';
import message from '@/assets/svg/message.svg';
import metamask from '@/assets/svg/metamask.svg';
import moneyBag from '@/assets/svg/money-bag.svg';
import playSolid from '@/assets/svg/play-solid.svg';
import plusCircle from '@/assets/svg/plus-circle.svg';
import plus from '@/assets/svg/plus.svg';
import reload from '@/assets/svg/reload.svg';
import security from '@/assets/svg/security.svg';
import star from '@/assets/svg/star.svg';
import trash from '@/assets/svg/trash.svg';
import twitterFill from '@/assets/svg/twitter-fill.svg';
import twitter from '@/assets/svg/twitter.svg';
import unlink from '@/assets/svg/unlink.svg';
import upload from '@/assets/svg/upload.svg';
import warning from '@/assets/svg/warning.svg';
import youtube from '@/assets/svg/youtube.svg';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  CircleAlert,
  Copy,
  EllipsisVertical,
  HelpCircle,
  Link,
  Link2Off,
  ListFilter,
  Loader2,
  LogOut,
  MoveRight,
  Search,
  User,
  Wallet,
  X,
} from 'lucide-react';

export type Icon = LucideIcon;

const IconList = {
  user: User,
  edit,
  checkCircle: CheckCircle,
  playSolid,
  angleDown,
  warning,
  eyeHidden,
  insecurity,
  arrowLeft: ArrowLeft,
  unlink,
  facebookCircle,
  twitter,
  eye,
  camera: Camera,
  bookmark,
  search: Search,
  closeCircle,
  reload,
  upload,
  metamask,
  trash,
  plusCircle,
  security,
  star,
  plus,
  location,
  moneyBag,
  message,
  bell,
  spinner: Loader2,
  arrowDown,
  dollar,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  copy: Copy,
  logout: LogOut,
  helpCircle: HelpCircle,
  google,
  facebook,
  twitterFill,
  discord,
  youtube,
  menu,
  close,
  checkCircleXs,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  wallet: Wallet,
  link: Link,
  x: X,
  circleAlert: CircleAlert,
  ellipsisVertical: EllipsisVertical,
  link2Off: Link2Off,
  circle: Circle,
  calendar: Calendar,
  moveRight: MoveRight,
  listFilter: ListFilter,
  check: Check,
};

export const Icons = IconList as Record<keyof typeof IconList, Icon>;
