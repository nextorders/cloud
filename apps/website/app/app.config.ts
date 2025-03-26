export default defineAppConfig({
  ui: {
    colors: {
      primary: 'black',
      secondary: 'zinc',
      neutral: 'zinc',
      error: 'rose',
    },
    icons: {
      loading: 'food:loader',
    },
    slideover: {
      slots: {
        header: 'py-2',
      },
    },
    modal: {
      slots: {
        title: 'text-xl',
        close: 'top-5 scale-110',
      },
    },
    input: {
      variants: {
        size: {
          xl: {
            base: 'px-4 py-3',
          },
        },
      },
    },
    inputNumber: {
      variants: {
        size: {
          xl: 'px-4 py-3',
        },
      },
    },
    select: {
      variants: {
        size: {
          xl: {
            base: 'px-4 py-3',
          },
        },
      },
    },
    selectMenu: {
      variants: {
        size: {
          xl: {
            base: 'px-4 py-3',
          },
        },
      },
    },
    button: {
      variants: {
        size: {
          xl: {
            base: 'px-4 py-3 font-semibold',
          },
        },
        variant: {
          gradient: 'text-neutral-950 bg-linear-to-br from-lime-300 to-green-400 hover:opacity-90 disabled:bg-none disabled:bg-(--ui-bg-elevated) disabled:text-neutral-400 aria-disabled:bg-(--ui-bg-elevated) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)',
        },
      },
    },
    tabs: {
      variants: {
        variant: {
          gradient: {
            list: 'bg-(--ui-bg-elevated) rounded-[calc(var(--ui-radius)*2)]',
            trigger: 'data-[state=active]:bg-linear-to-br from-lime-300 to-green-400 data-[state=active]:text-neutral-950 flex-1 w-full',
            indicator: 'rounded-[calc(var(--ui-radius)*1.5)] shadow-xs',
          },
        },
      },
    },
  },
})
