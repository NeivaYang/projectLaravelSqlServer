<button {{ $attributes->merge(['type' => 'button', 'class' => 'tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-bg-white tw-dark:bg-gray-800 tw-border tw-border-gray-300 tw-dark:border-gray-500 tw-rounded-md tw-font-semibold tw-text-xs tw-text-gray-700 tw-dark:text-gray-300 tw-uppercase tw-tracking-widest tw-shadow-sm tw-hover:bg-gray-50 tw-dark:hover:bg-gray-700 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-indigo-500 tw-focus:ring-offset-2 tw-dark:focus:ring-offset-gray-800 tw-disabled:opacity-25 tw-transition tw-ease-in-out tw-duration-150']) }}>
    {{ $slot }}
</button>
