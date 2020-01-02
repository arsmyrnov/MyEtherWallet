// import normalise from '@/helpers/normalise';
// import { Misc } from '@/helpers';
import { toChecksumAddress } from '@/helpers/addressUtils';
// import utils from 'web3-utils';
// import WAValidator from 'wallet-address-validator';
// import { EthereumTokens } from '@/partners';
// import { canValidate } from '@/partners/helpers';
// import MAValidator from 'multicoin-address-validator';
// import getMultiCoinAddress from '@/helpers/ENSMultiCoin.js';
import Resolution, {
  ResolutionError
  // ResolutionErrorCode
} from '@unstoppabledomains/resolution';
const resolution = new Resolution();

const AddrResolver = {
  bind: function(el, binding, vnode) {
    let network = vnode.context.$store.state.network;
    let parentCurrency = vnode.context.$parent.currency
      ? vnode.context.$parent.currency
      : network.type.name;
    let address = '';
    vnode.context.$parent.$watch('$store.state.network', function(e) {
      network = e;
      parentCurrency = e.type.name;
      removeElements();
      actualProcess(address);
    });
    vnode.context.$parent.$watch('currency', function(e) {
      parentCurrency = e;
      removeElements();
      actualProcess(address);
    });
    vnode.context.$watch(binding.value, function(e) {
      address = e;
      removeElements();
      actualProcess(e);
    });
    const removeElements = function() {
      const child = el.parentNode.parentNode.lastChild;
      Object.keys(child.classList).forEach(item => {
        if (
          child.classList[item] === 'resolver-error' ||
          child.classList[item] === 'resolver-addr'
        ) {
          vnode.elm.parentNode.parentNode.removeChild(child);
        }
      });
    };
    const actualProcess = async function(e) {
      const domain = e;
      const messagePar = document.createElement('p');
      const _this = vnode.context;
<<<<<<< HEAD
      if (resolution.isSupportedDomain(domain)) {
        try {
          const address = await resolution.addressOrThrow(
            domain,
            parentCurrency
          );
          if (address) {
            messagePar.classList.add('resolver-addr');
            _this.isValidAddress = true;
            _this.hexAddress = toChecksumAddress(address);
            messagePar.innerText = _this.hexAddress;
            el.parentNode.parentNode.appendChild(messagePar);
          }
        } catch (err) {
          messagePar.classList.add('resolver-error');
          console.log('err.code = ', err.code);
          if (err instanceof ResolutionError) {
            messagePar.innerText = _this.$t(
              `ens.unstoppableResolution.${err.code}`,
              {
                domain,
                method: resolution.serviceName(domain),
                currencyticker: parentCurrency
              }
            );
            el.parentNode.parentNode.appendChild(messagePar);
          }
=======
      const checkDarklist = function(addr) {
        const isDarklisted = Misc.isDarklisted(addr);
        if (isDarklisted.error) {
          removeElements();
          _this.isValidAddress = false;
          _this.hexAddress = '';
          messagePar.innerText =
            isDarklisted.msg.length > 0
              ? isDarklisted.msg
              : _this.$t('ens.unstoppableResolution.address-reported-error');
          el.parentNode.parentNode.appendChild(messagePar);
          return true;
        }
        return false;
      };
      try {
        const address = await resolution.addressOrThrow(domain, parentCurrency);
        if (address) {
          if (!checkDarklist(address)) {
            const addCheck = WAValidator.validate(e, parentCurrency);
            if (addCheck) {
              _this.isValidAddress = addCheck;
              _this.hexAddress = toChecksumAddress(e);
              removeElements();
              messagePar.classList.add('resolver-addr');
              _this.isValidAddress = true;
              _this.hexAddress = toChecksumAddress(address);
              messagePar.innerText = _this.hexAddress;
              el.parentNode.parentNode.appendChild(messagePar);
            }
          }
>>>>>>> a9606339d... updates
        }
      } catch (err) {
        messagePar.classList.add('resolver-error');
        if (err instanceof ResolutionError) {
          messagePar.innerText = _this.$t(
            `ens.unstoppableResolution.${err.code}`,
            {
              domain,
              method: resolution.serviceName(domain),
              currencyticker: parentCurrency
            }
          );
          el.parentNode.parentNode.appendChild(messagePar);
        } else throw err;
      }
    };
  }
};
export default AddrResolver;
