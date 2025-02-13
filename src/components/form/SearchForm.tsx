import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

type SearchFormProps = {
  userName: string
  setUserName: React.Dispatch<React.SetStateAction<string>>
}

const SearchForm = ({ setUserName }: SearchFormProps) => {
  const formSchema = z.object({
    username: z.string().min(3, {
      message: 'Username must be at least 2 characters.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })
  const { handleSubmit, control } = form
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.username === '' || values.username.length < 3) {
      toast.error('Please enter a valid username')
      return
    }
    setUserName(values.username)
    console.log(values)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-end gap-x-2 w-full lg:w-1/3 mb-8'
      >
        <FormField
          control={control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder='Search Github User...'
                  {...field}
                  className='flex-grow bg-background'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Search</Button>
      </form>
    </Form>
  )
}

export default SearchForm
