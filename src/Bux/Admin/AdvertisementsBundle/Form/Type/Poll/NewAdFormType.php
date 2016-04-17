<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/9/15
 * Time: 3:15 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Form\Type\Poll;

use Bux\Admin\AdvertisementsBundle\Form\Type\AdMembershipFormType;
use Bux\AdvertiseBundle\Form\Type\AdCountryFormType;
use Bux\AdvertiseBundle\Form\Type\Poll\PollAdAnswersFormType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class NewAdFormType
 *
 * @package Bux\Admin\AdvertisementsBundle\Form\Type\Poll
 */
class NewAdFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('description', 'text', array(
                'required'  => false
            ))
            ->add('question', 'text', array(
            ))
            ->add('answers', 'collection', array(
                'type'  => new PollAdAnswersFormType()
            ))
            ->add('credits', 'integer', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('maxClickInDay', 'integer', array(
            ))
//            ->add('premiumMembers', 'radio', array(
//                'required'  => false
//            ))
//            ->add('terms', 'checkbox', array(
//                'mapped'  => false,
//                'required'  => true
//            ))
            ->add('value', 'entity', array(
                'class' => 'BuxAdminAdvertisementsBundle:PollCategories',
                'property'  => 'value'
            ))
            ->add('memberships', new AdMembershipFormType(), array(

            ))
            ->add('countries', new AdCountryFormType(), array(
                'required'  => false
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\AdvertiseBundle\Entity\PollAd',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'new_poll_ad_form_type';
    }
}