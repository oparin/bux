<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/12/15
 * Time: 5:54 PM
 */

namespace Bux\Admin\MembersBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class PurchaseWalletFormType
 *
 * @package Bux\Admin\MembersBundle\Form\Type
 */
class PurchaseWalletFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('sum', 'money', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\WalletBundle\Entity\PurchaseWallet',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'purchase_wallet_form_type';
    }
}