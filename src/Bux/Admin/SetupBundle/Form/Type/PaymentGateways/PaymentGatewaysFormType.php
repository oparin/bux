<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/6/15
 * Time: 12:12 PM
 */

namespace Bux\Admin\SetupBundle\Form\Type\PaymentGateways;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class PaymentGatewaysFormType
 *
 * @package Bux\Admin\SetupBundle\Form\Type\PaymentGateways
 */
class PaymentGatewaysFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('perfectMoney', new PerfectMoneyFormType(), array(
                'constraints'   => array(
                    new NotBlank()
                ),
            ))
            ->add('payeer', new PayeerFormType(), array(
                'constraints'   => array(
                    new NotBlank()
                ),
            ));
    }

//    /**
//     * @param OptionsResolverInterface $resolver
//     */
//    public function setDefaultOptions(OptionsResolverInterface $resolver)
//    {
//        $resolver->setDefaults(array(
//            'data_class' => 'Bux\UserBundle\Entity\Membership',
//        ));
//    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'payments_gateways_form_type';
    }
}