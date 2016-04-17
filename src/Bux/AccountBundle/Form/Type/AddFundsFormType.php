<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/6/15
 * Time: 5:26 PM
 */

namespace Bux\AccountBundle\Form\Type;

use Bux\WalletBundle\Entity\PaymentMethod;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class AddFundsFormType
 *
 * @package Bux\AccountBundle\Form\Type
 */
class AddFundsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
//            ->add('method', 'entity', array(
//                'class'         => 'BuxWalletBundle:PaymentMethod',
//                'property'      => 'name',
//                'empty_value'   => '',
//                'constraints'   => array(
//                    new NotBlank()
//                )
//            ))
            ->add('method', 'choice', array(
                'choices'   => array(
                    'balance' => 'Account Balance',
                    'perfect_money' => 'Perfect Money',
                    'payeer' => 'PayPal'
                ),
                'empty_value'   => '',
                'constraints'   => array(
                    new NotBlank()
                ),
            ))
            ->add('amount', 'money', array(
                'currency'      => 'USD',
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
        return 'add_funds_form_type';
    }
}