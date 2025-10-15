import { ButtonText, Button as DefaultUiButton } from './ui/button'
import { cn } from '../lib/utils'
import { ButtonProps } from 'react-native'

type PropsType = ButtonProps & {
  title: string
  className?: string
}

export default function Button({ title, className, ...props }: PropsType) {
  return (
    <DefaultUiButton
      {...props}
      className={cn(
        'ios:py-4 android:py-1 h-[52px] rounded-full bg-button data-[hover=true]:bg-button/70 data-[active=true]:bg-button/70',
        className,
      )}
    >
      <ButtonText className="text-center text-[16px] font-semibold text-white">
        {title}
      </ButtonText>
    </DefaultUiButton>
  )
}
