<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Perfil') }}
        </h2>
    </x-slot>

    <div class="tw-py-12">
        <div class="tw-max-w-7xl tw-mx-auto tw-sm:tw-px-6 tw-lg:tw-px-8 tw-space-y-6">
            <div class="tw-p-4 tw-sm:p-8 tw-bg-white tw-dark:bg-gray-800 tw-shadow tw-sm:tw-rounded-lg">
                <div class="tw-max-w-xl">
                    @include('profile.partials.update-profile-information-form')
                </div>
            </div>

            <div class="tw-p-4 tw-sm:p-8 tw-bg-white tw-dark:bg-gray-800 tw-shadow tw-sm:tw-rounded-lg">
                <div class="tw-max-w-xl">
                    @include('profile.partials.update-password-form')
                </div>
            </div>

            <div class="tw-p-4 tw-sm:p-8 tw-bg-white tw-dark:bg-gray-800 tw-shadow tw-sm:tw-rounded-lg">
                <div class="tw-max-w-xl">
                    @include('profile.partials.delete-user-form')
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
