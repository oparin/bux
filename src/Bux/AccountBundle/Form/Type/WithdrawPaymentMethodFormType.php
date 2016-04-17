<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/8/15
 * Time: 9:17 AM
 */

namespace Bux\AccountBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class WithdrawPaymentMethodFormType
 *
 * @package Bux\AccountBundle\Form\Type
 */
class WithdrawPaymentMethodFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('method', 'entity', array(
                'class'         => 'BuxWalletBundle:PaymentMethod',
                'property'      => 'name',
                'empty_value'   => '',
                'constraints'   => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'withdraw_payment_method_form_type';
    }
}