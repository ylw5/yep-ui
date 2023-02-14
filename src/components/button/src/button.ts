import type { PropType } from 'vue'
export const buttonProps = {
  type: {
    type: String as PropType<'primary' | 'default' | 'dashed' | 'text' | 'link'>,
    default: 'default',
  },
  size: {
    type: String as PropType<'large' | 'medium' | 'small' | 'mini'>,
    default: 'medium',
  },
  plain: {
    type: Boolean,
    default: false,
  },
  shape: {
    type: String as PropType<'circle' | 'round'>,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
}
