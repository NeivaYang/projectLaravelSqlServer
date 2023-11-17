@section('title', 'Dashboard')
<x-app-layout>
    <x-slot name="header">
        <h2 class="tw-font-semibold tw-text-xl tw-text-gray-800 tw-dark:tw-text-gray-200 tw-leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="tw-pt-12">
        <div class="tw-max-w-7xl tw-mx-auto sm:tw-px-6 lg:tw-px-8">
            <div class="tw-bg-white tw-dark:tw-bg-gray-800 tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                <div class="tw-p-6 tw-text-gray-900 tw-dark:tw-text-gray-100">
                    {{ __("Bem Vindo!") }}
                </div>
            </div>
        </div>
    </div>
    <div class="tw-py-4">
        <div class="tw-max-w-7xl tw-mx-auto sm:tw-px-6 lg:tw-px-8">
            <div class="tw-bg-white tw-dark:tw-bg-gray-800 tw-shadow-sm sm:tw-rounded-lg">
                <div class="tw-p-6 tw-text-gray-900 tw-dark:tw-text-gray-100">
                    <form method="POST" action="{{ route('password.email') }}" class="tw-flex tw-items-center tw-justify-center gap-2">
                        <div class="col-6">
                            <x-input-label for="origin-lang" :value="__('Lingua de origem')" />
                            <x-select name="origin_lang" id="origin-lang"  class="tw-mt-1 tw-w-full">
                                <option value="1">Teste 1</option>
                                <option value="2">Teste 2</option>
                                <option value="3">Teste 3</option>
                            </x-select>
                        </div>
                        <div class="col-6">
                            <x-input-label for="text-translated" :value="__('Texto traduzido')" />
                            <x-select name="text_translated" id="text-translated"  class="tw-mt-1 tw-w-full">
                                <option value="1">Teste 1</option>
                                <option value="2">Teste 2</option>
                                <option value="3">Teste 3</option>
                            </x-select>
                        </div>
                    </form>
                    <div class="tw-max-w-7xl tw-mx-auto sm:tw-px-6 lg:tw-px-8">
                        <div class="tw-bg-white tw-dark:tw-bg-gray-800 tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                            <div class="tw-p-6 tw-text-gray-900 tw-dark:tw-text-gray-100 tw-flex tw-items-center tw-justify-center">
                                <x-primary-button id="button-translate">
                                    {{ __('Traduzir') }}
                                </x-primary-button>
                            </div>
                        </div>
                    </div>
                    <div class="tw-max-w-7xl tw-mx-auto">
                        <div class="tw-bg-white tw-dark:tw-bg-gray-800 tw-shadow-sm sm:tw-rounded-lg">
                            <div class="tw-text-gray-900 tw-dark:tw-text-gray-100 tw-flex tw-items-center tw-justify-center gap-2">
                                <div class="col-6">
                                    <x-textarea class="tw-mt-1 col-12" aria-placeholder="Escreva aqui o texto à traduzir">
                                    </x-textarea>
                                </div>
                                <div class="col-6">
                                    <x-textarea class="tw-mt-1 col-12" :disabled="true">
                                        {{ __('Traduzir') }}
                                    </x-textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
