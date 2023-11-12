<x-guest-layout>
    <div class="tw-mb-4 tw-text-sm tw-text-gray-600 tw-dark:text-gray-400">
        {{ __('Obrigado por se inscrever! Antes de começar, você poderia verificar seu endereço de e-mail clicando no link que acabamos de enviar para você? Se você não recebeu o e-mail, teremos prazer em enviar outro.') }}
    </div>

    @if (session('status') == 'verification-link-sent')
        <div class="tw-mb-4 tw-font-medium tw-text-sm tw-text-green-600 tw-dark:text-green-400">
            {{ __('Um novo link de verificação foi enviado para o endereço de e-mail que você forneceu durante o registro.') }}
        </div>
    @endif

    <div class="tw-mt-4 tw-flex tw-items-center tw-justify-between">
        <form method="POST" action="{{ route('verification.send') }}">
            @csrf

            <div>
                <x-primary-button>
                    {{ __('Reenviar email de verificação') }}
                </x-primary-button>
            </div>
        </form>

        <form method="POST" action="{{ route('logout') }}">
            @csrf

            <button type="submit" class="tw-underline tw-text-sm tw-text-gray-600 tw-dark:text-gray-400 tw-hover:text-gray-900 tw-dark:hover:text-gray-100 tw-rounded-md tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-offset-2 tw-focus:tw-ring-indigo-500 tw-dark:focus:tw-ring-offset-gray-800">
                {{ __('Sair') }}
            </button>
        </form>
    </div>
</x-guest-layout>
