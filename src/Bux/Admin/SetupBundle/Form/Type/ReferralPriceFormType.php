<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/29/15
 * Time: 2:15 PM
 */

namespace Bux\Admin\SetupBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class ReferralPriceFormType
 *
 * @package Bux\Admin\SetupBundle\Form\Type
 */
class ReferralPriceFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('monthly', 'money', array(
                'constraints'   => array(
                    new NotBlank()
                ),
                'currency'  => 'USD'
            ))
            ->add('autopay', 'money', array(
                'constraints'   => array(
                    new NotBlank()
                ),
                'currency'  => 'USD'
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\UserBundle\Entity\ReferralPrice',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'referral_price_form_type';
    }
}