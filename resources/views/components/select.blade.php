@props(['disabled' => false])

<select {{ $disabled ? 'disabled' : '' }} {!! $attributes->merge(['class' => 'tw-border-gray-300 tw-dark:tw-border-gray-700 tw-dark:tw-bg-gray-900 tw-dark:tw-text-gray-300 focus:tw-border-indigo-500 tw-dark:focus:tw-border-indigo-600 focus:tw-ring-indigo-500 tw-dark:focus:tw-ring-indigo-600 tw-rounded-md tw-shadow-sm']) !!}>
    {{ $slot }}
</select>