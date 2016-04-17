<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/7/15
 * Time: 3:39 PM
 */

namespace Bux\Admin\DepositsBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class AddManualDepositFormType
 *
 * @package Bux\Admin\DepositsBundle\Form\Type
 */
class AddManualDepositFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('amount', 'money', array(
                'currency'      => 'USD',
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('method', 'entity', array(
                'class'         => 'BuxWalletBundle:PaymentMethod',
                'property'      => 'name',
                'empty_value'   => 'All',
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('fromAccount', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('transactionID', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ))
            ->add('purchaseBalance', 'checkbox', array(
                'data'      => true,
                'label'     => 'Add amount to purchase balance.',
                'required'  => false
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'admin_deposit_add_manual_deposit_form_type';
    }
}