<section class="tw-space-y-6">
    <header>
        <h2 class="tw-text-lg tw-font-medium tw-text-gray-900 tw-dark:tw-text-gray-100">
            {{ __('Deletar Conta') }}
        </h2>

        <p class="tw-mt-1 tw-text-sm tw-text-gray-600 tw-dark:tw-text-gray-400">
            {{ __('Uma vez que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Antes de excluir sua conta, faça o download de quaisquer dados ou informações que deseja manter.') }}
        </p>
    </header>

    <x-danger-button
        x-data=""
        x-on:click.prevent="$dispatch('open-modal', 'confirm-user-deletion')"
    >{{ __('Deletar Conta') }}</x-danger-button>

    <x-modal name="confirm-user-deletion" :show="$errors->userDeletion->isNotEmpty()" focusable>
        <form method="post" action="{{ route('profile.destroy') }}" class="tw-p-6">
            @csrf
            @method('delete')

            <h2 class="tw-text-lg tw-font-medium tw-text-gray-900 tw-dark:tw-text-gray-100">
                {{ __('Tem certeza de que deseja excluir sua conta?') }}
            </h2>

            <p class="tw-mt-1 tw-text-sm tw-text-gray-600 tw-dark:ttw-ext-gray-400">
                {{ __('Uma vez que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Por favor, digite sua senha para confirmar que você deseja excluir permanentemente sua conta.') }}
            </p>

            <div class="tw-mt-6">
                <x-input-label for="password" value="{{ __('Password') }}" class="tw-sr-only" />

                <x-text-input
                    id="password"
                    name="password"
                    type="password"
                    class="tw-mt-1 tw-block tw-w-3/4"
                    placeholder="{{ __('Senha') }}"
                />

                <x-input-error :messages="$errors->userDeletion->get('password')" class="tw-mt-2" />
            </div>

            <div class="tw-mt-6 tw-flex tw-justify-end">
                <x-secondary-button x-on:click="$dispatch('close')">
                    {{ __('Cancelar') }}
                </x-secondary-button>

                <x-danger-button class="tw-ms-3">
                    {{ __('Deletar Conta') }}
                </x-danger-button>
            </div>
        </form>
    </x-modal>
</section>
